import os

import boto3
from botocore.exceptions import NoCredentialsError
from datetime import datetime
import humanize
import time

class AWSFileManager:
    def __init__(self, bucket_name, aws_access_key, aws_secret_key, aws_region):
        print(bucket_name, aws_access_key, aws_secret_key, aws_region)
        self.bucket_name = bucket_name
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=aws_region
        )

    def upload_file(self, file, filePath=None, contentType='image/png'):
        """
        Upload a file to AWS S3 bucket
        Args:
            file: File object to upload
            filePath: Optional custom name and path for the file in S3
        Returns:
            str: URL of the uploaded file if successful, None if failed
        """ 
        try:
            print(f"Uploading file to S3: {filePath}")
            print(f"File object: {file}")
            print(f"Content type: {contentType}")
            
            # Upload file to S3
            self.s3.upload_fileobj(
                file,
                self.bucket_name,
                filePath,
                ExtraArgs={'ContentType': contentType}
            )
            
            # Generate URL for the uploaded file
            url = f"https://{self.bucket_name}.s3.amazonaws.com/{filePath}?v={time.time()}"
            return url
            
        except Exception as e:
            print(f"Error uploading file to S3: {e}")
            import traceback
            traceback.print_exc()
            raise e
            

    def list_files(self, prefix=''):
        """List files in the root folder or specified prefix"""
        try:
            # Test connection
            print(f"Attempting to list bucket: {self.bucket_name}")
            print(f"Using region: {self.s3.meta.region_name}")
            
            response = self.s3.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=prefix,
                Delimiter='/'
            )
            
            # Debug response
            print(f"Response: {response}")
            
            files = []
            
            # Process files
            if 'Contents' in response:
                for obj in response['Contents']:
                    # Skip if the object is a folder
                    if obj['Key'].endswith('/'):
                        continue
                        
                    files.append({
                        'name': obj['Key'],
                        'size': humanize.naturalsize(obj['Size']),
                        'last_modified': obj['LastModified'].strftime('%Y-%m-%d %H:%M:%S'),
                        'type': self._get_file_type(obj['Key'])
                    })
            
            return files
            
        except Exception as e:
            print(f"Error listing files: {str(e)}")
            return []

    def get_bucket_stats(self):
        """Get storage statistics"""
        try:
            files = self.list_files()
            total_size = sum(int(file['size'].split()[0]) for file in files)
            
            return {
                'total_files': len(files),
                'storage_used': humanize.naturalsize(total_size),
                'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
        except Exception as e:
            print(f"Error getting stats: {str(e)}")
            return {
                'total_files': 0,
                'storage_used': '0 B',
                'last_updated': 'N/A'
            }

    def _get_file_type(self, filename):
        ext = filename.split('.')[-1].lower() if '.' in filename else ''
        type_mapping = {
            'image': ['jpg', 'jpeg', 'png', 'gif'],
            'document': ['pdf', 'doc', 'docx', 'txt'],
            'spreadsheet': ['xls', 'xlsx', 'csv'],
            'other': []
        }
        
        for file_type, extensions in type_mapping.items():
            if ext in extensions:
                return file_type
        return 'other'

    def download_file(self, object_name, file_name):
        try:
            self.s3.download_file(self.bucket_name, object_name, file_name)
            return True
        except NoCredentialsError:
            return False

    def delete_file(self, object_name):
        try:
            self.s3.delete_object(Bucket=self.bucket_name, Key=object_name)
            return True
        except NoCredentialsError:
            return False



aws = AWSFileManager(
    bucket_name=str(os.getenv('AWS_BUCKET_NAME', 'ecom.sys')),
    aws_access_key=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_key=os.getenv('AWS_SECRET_ACCESS_KEY'), 
    aws_region=os.getenv('AWS_DEFAULT_REGION')
)
